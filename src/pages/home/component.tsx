import { useSelector } from "react-redux"
import { ChatsMessages, userId } from "../../assets/mock/chats"
import { RootState } from "../../store"
import { useEffect, useState } from "react"

type chatType = {
    id: number,
    chatId: number,
    receiverId: number,
    senderId: number,
    content: string,
    time: string,
}

export const Home = () => {
    const selectedChatId = useSelector((state: RootState) => state.selectedChat.id)
    const [chats, setChats] = useState<chatType[]>([]);

    useEffect(() => {
        const f = async () => {
            return fetch('http://localhost:8000/chats');
        };
        f().then((r) => r.json()).then((r) => setChats(r));
    }, []);

    return (
        <div className="flex-grow chat-wrapper p-6">
            {chats.map((el, ind) => (
                ((selectedChatId === el.receiverId && el.senderId === userId) || (selectedChatId === el.senderId && el.receiverId === userId) ) && <div className="flex max-w-[500px] relative" key={ind}>
                    {((ind !== 0 && ChatsMessages[ind].receiverId !== ChatsMessages[ind-1].receiverId) || ind === 0) && <img className="chat-icon" src={require("../../assets/images/profile-icon.png")} alt="" />}
                    <div className="chat-content flex">
                        <p>{el.content}</p>
                        <p className="text-[12px] text-zinc-800">{el.time}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}