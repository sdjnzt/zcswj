import React, { createContext, useContext, useEffect, useState } from 'react';

interface RealtimeMessage {
  id: number;
  type: '告警' | '通知';
  content: string;
  time: string;
  read?: boolean;
}

interface RealtimeContextType {
  messages: RealtimeMessage[];
  unreadCount: number;
  markRead: (id: number) => void;
  clearAll: () => void;
}

const RealtimeContext = createContext<RealtimeContextType>({
  messages: [],
  unreadCount: 0,
  markRead: () => {},
  clearAll: () => {},
});

export const RealtimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<RealtimeMessage[]>([]);
  const [id, setId] = useState(1);

  // 定时生成mock实时告警/通知
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const type = Math.random() > 0.5 ? '告警' : '通知';
      const content = type === '告警'
        ? `【${now.toLocaleTimeString()}】设备${Math.floor(Math.random()*10+1)}出现异常！`
        : `【${now.toLocaleTimeString()}】水费收缴完成提醒。`;
      setMessages(msgs => [
        { id, type, content, time: now.toLocaleTimeString(), read: false },
        ...msgs.slice(0, 19)
      ]);
      setId(i => i + 1);
    }, 15000); // 15秒一条
    return () => clearInterval(timer);
  }, [id]);

  const markRead = (id: number) => {
    setMessages(msgs => msgs.map(m => m.id === id ? { ...m, read: true } : m));
  };
  const clearAll = () => setMessages([]);

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <RealtimeContext.Provider value={{ messages, unreadCount, markRead, clearAll }}>
      {children}
    </RealtimeContext.Provider>
  );
};

export const useRealtime = () => useContext(RealtimeContext); 