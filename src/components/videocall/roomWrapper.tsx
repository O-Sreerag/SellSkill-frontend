import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import Room from './content';
import HostPanel from './hostPanel';
// import { AppRootState } from '../../redux/store';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const RoomWrapper = () => {
    //   const { userName, isHost } = useSelector((state: AppRootState) => state.user);
    const isHost = false
    const query = useQuery();
    const [roomID, setRoomID] = useState<string>("")

    let room: string
    useEffect(() => {
        room = query.get('r') ?? ""
        console.log("roomID :", room)

        setRoomID(room)
    }, [])

    return (
        <div>
            <Room />
            {isHost && <HostPanel roomID={roomID} />}
        </div>
    );
};

export default RoomWrapper;