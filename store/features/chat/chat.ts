export interface Contact {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  isOnline?: boolean;
  checkType?: "single" | "double" | "read";
}

export interface Message {
  id: string;
  content: string;
  time: string;
  isSent: boolean;
}
