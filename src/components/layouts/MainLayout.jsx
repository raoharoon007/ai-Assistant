import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ChatHeader from '../Chat/ChatHeader';
import ChatSidebar from '../Chat/ChatSidebar';

const MainLayout = () => {
  const [chats, setChats] = useState([
    { id: "1", title: "Seeking Relief from", messages: [
        { role: "user", text: "I am feeling constant body pain." },
        { role: "assistant", text: "Can you tell me where exactly the pain is?" },
        { role: "user", text: "Mostly in my lower back and legs." },
        { role: "assistant", text: "This could be muscle fatigue or posture related." }
    ]},
    { id: "2", title: "Guidance for Managing", messages: [
        { role: "user", text: "How can I manage stress daily?" },
        { role: "assistant", text: "Start with small breathing exercises." },
        { role: "user", text: "Does meditation really help?" },
        { role: "assistant", text: "Yes, even 5 minutes daily can help." }
    ]},
    { id: "3", title: "Need Help Identifying a", messages: [
        { role: "user", text: "I have frequent headaches." },
        { role: "assistant", text: "Do they happen at a specific time?" },
        { role: "user", text: "Mostly in the evening." },
        { role: "assistant", text: "That may be screen fatigue." }
    ]},
    { id: "4", title: "Navigating Through", messages: [
        { role: "user", text: "How to improve sleep quality?" },
        { role: "assistant", text: "Avoid screens before bedtime." },
        { role: "user", text: "Any natural remedy?" },
        { role: "assistant", text: "Chamomile tea can help." }
    ]},
    { id: "5", title: "Rehabilitation Strategies", messages: [
        { role: "user", text: "My knee hurts while walking." },
        { role: "assistant", text: "Is there swelling present?" },
        { role: "user", text: "Yes, slightly." },
        { role: "assistant", text: "You should rest and apply ice." }
    ]},
    { id: "6", title: "Worried About Seasonal", messages: [
        { role: "user", text: "Seasonal allergies are bothering me." },
        { role: "assistant", text: "Do you experience sneezing or itching?" },
        { role: "user", text: "Yes, both." },
        { role: "assistant", text: "Antihistamines can help." }
    ]},
    { id: "7", title: "Finding Resources", messages: [
        { role: "user", text: "Where can I find mental health resources?" },
        { role: "assistant", text: "Online therapy platforms are useful." },
        { role: "user", text: "Are they affordable?" },
        { role: "assistant", text: "Many offer free initial sessions." }
    ]},
    { id: "8", title: "Exploring Treatment", messages: [
        { role: "user", text: "What are treatment options for anxiety?" },
        { role: "assistant", text: "Therapy and lifestyle changes work well." },
        { role: "user", text: "Is medication required?" },
        { role: "assistant", text: "Only in moderate to severe cases." }
    ]},
    { id: "9", title: "Understanding the", messages: [
        { role: "user", text: "I want to understand my diagnosis." },
        { role: "assistant", text: "What symptoms are you experiencing?" },
        { role: "user", text: "Fatigue and weakness." },
        { role: "assistant", text: "Blood tests may be required." }
    ]},
    { id: "10", title: "Discussing Ways to", messages: [
        { role: "user", text: "How can I control IBS symptoms?" },
        { role: "assistant", text: "Diet plays a major role." },
        { role: "user", text: "Any food to avoid?" },
        { role: "assistant", text: "Avoid spicy and processed foods." }
    ]},
    { id: "11", title: "Looking for Practical IBS", messages: [
        { role: "user", text: "IBS is affecting my routine." },
        { role: "assistant", text: "Have you tried a low FODMAP diet?" },
        { role: "user", text: "No, what is that?" },
        { role: "assistant", text: "It reduces digestive stress." }
    ]},
    { id: "12", title: "Inquiries About Managing", messages: [
        { role: "user", text: "How to manage chronic pain?" },
        { role: "assistant", text: "Physical therapy helps a lot." },
        { role: "user", text: "Any home exercises?" },
        { role: "assistant", text: "Stretching daily is effective." }
    ]},
    { id: "13", title: "Information on Coping", messages: [
        { role: "user", text: "How to cope with anxiety?" },
        { role: "assistant", text: "Grounding techniques are useful." },
        { role: "user", text: "Can you suggest one?" },
        { role: "assistant", text: "Try the 5-4-3-2-1 method." }
    ]},
    { id: "14", title: "Identifying and Treating", messages: [
        { role: "user", text: "How is arthritis treated?" },
        { role: "assistant", text: "Pain management is key." },
        { role: "user", text: "Is exercise safe?" },
        { role: "assistant", text: "Yes, low-impact exercise helps." }
    ]},
    { id: "15", title: "Seeking a Supportive", messages: [
        { role: "user", text: "I need emotional support." },
        { role: "assistant", text: "I am here to listen." },
        { role: "user", text: "I feel overwhelmed." },
        { role: "assistant", text: "You're not alone in this." }
    ]},
    { id: "16", title: "Chatting About", messages: [
        { role: "user", text: "Let's talk about health habits." },
        { role: "assistant", text: "Sure, where do you want to start?" },
        { role: "user", text: "Daily routine." },
        { role: "assistant", text: "Consistency is the key." }
    ]}
  ]);

  return (
    <div className="h-screen flex flex-col bg-bodybg overflow-hidden z-0">
      <ChatHeader />

      <div className="flex flex-1 z-30 overflow-hidden">
        <ChatSidebar chats={chats} setChats={setChats} />

        <main className="flex-1 flex justify-center overflow-y-auto">
          <Outlet context={{ chats, setChats }} />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;