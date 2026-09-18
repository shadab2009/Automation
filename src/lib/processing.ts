import { PrismaClient, Direction, MessageStatus } from '@prisma/client';
export const prisma = new PrismaClient();
export const DEFAULT_REPLY = "Hello! You have reached Shadab's personal assistant.\nShadab is currently unavailable.\nYour message has been received, and Shadab will be informed.\nThank you for your patience.";
export async function processIncoming(input:{provider:string; providerMessageId:string; senderIdentifier:string; senderName?:string; content:string; userId:string; fail?:boolean}) {
  if (!input.content.trim() || input.content.length>4000) throw new Error('Message content must be between 1 and 4000 characters');
  const existing=await prisma.message.findUnique({where:{provider_providerMessageId:{provider:input.provider,providerMessageId:input.providerMessageId}}}); if(existing) return {duplicate:true,incoming:existing,reply:null};
  const contact=await prisma.contact.upsert({where:{identifier:input.senderIdentifier},update:{name:input.senderName},create:{identifier:input.senderIdentifier,name:input.senderName}});
  const conversation=await prisma.conversation.upsert({where:{userId_contactId:{userId:input.userId,contactId:contact.id}},update:{},create:{userId:input.userId,contactId:contact.id}});
  const incoming=await prisma.message.create({data:{provider:input.provider,providerMessageId:input.providerMessageId,senderIdentifier:input.senderIdentifier,content:input.content,conversationId:conversation.id,direction:Direction.INCOMING,status:MessageStatus.RECEIVED}});
  const settings=await prisma.assistantSettings.findUnique({where:{userId:input.userId}}); const shouldReply=!!settings?.enabled && (!settings.workingHoursEnabled || settings.replyOutsideWorkingHours);
  if(!shouldReply) return {duplicate:false,incoming,reply:null};
  const reply=await prisma.message.create({data:{provider:input.provider,senderIdentifier:input.senderIdentifier,content:settings?.automaticReply||DEFAULT_REPLY,conversationId:conversation.id,direction:Direction.OUTGOING,status:input.fail?MessageStatus.FAILED:MessageStatus.SENT,error:input.fail?'Simulated provider failure':undefined}});
  await prisma.notification.create({data:{userId:input.userId,type:'NEW_MESSAGE',title:'New message received',body:`${input.senderName||input.senderIdentifier}: ${input.content.slice(0,120)}`}});
  return {duplicate:false,incoming,reply};
}
