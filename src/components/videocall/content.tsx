// import React, { useEffect, useRef, useState } from 'react'
// import { useLocation, useParams } from 'react-router-dom'
// import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
// import { AppRootState } from '../../redux/store';
// import { useSelector } from 'react-redux';
// import axios from 'axios';

// const useQuery = () => {
//   return new URLSearchParams(useLocation().search);
// };

// const Room = () => {
//   const { userName = 'name', userEmail = 'email' } = useSelector((state: AppRootState) => state.user)
//   const query = useQuery();
//   const [isApproved, setIsApproved] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [roomID, setRoomID] = useState<string>("")
  
//   let room: string, email: string
//   useEffect(() => {
//       room = query.get('r') ?? ""
//       email = query.get('e') ?? ""
//       console.log("roomID :", room)
//       console.log("email :", email)

//       setRoomID(room)
//   }, [])

//   // useEffect(() => {
//   //   const requestJoin = async () => {
//   //     try {
//   //       const response = await axios.post('/api/requestJoin', { roomID, userEmail, userName });
//   //       if (response.data.approved) {
//   //         setIsApproved(true);
//   //       } else if (response.data.notApproved) {
//   //         setIsApproved(false);
//   //       } 
//   //     } catch (error) {
//   //       console.error('Failed to request join:', error);
//   //     }
//   //   };

//   //   requestJoin();
//   // }, [roomID, userName]);

//   // useEffect(() => {
//   //   if (isApproved && containerRef.current) {
//   //     myMeeting(containerRef.current);
//   //   }
//   // }, [isApproved]);

//   function randomID(len: any) {
//     let result = '';
//     if (result) return result;
//     var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
//       maxPos = chars.length,
//       i;
//     len = len || 5;
//     for (i = 0; i < len; i++) {
//       result += chars.charAt(Math.floor(Math.random() * maxPos));
//     }
//     return result;
//   }

//   const myMeeting = async (element: any) => {
//     console.log("roomID", roomID)
//     const appID = 462463171
//     const serverSecret = "185d580a5d35139557e75a407bbec3e7"
//     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), userName);

//     const zp = ZegoUIKitPrebuilt.create(kitToken);
//     zp.joinRoom({
//       container: element,
//       sharedLinks: [
//         {
//           name: 'Personal link',
//           url:
//             window.location.protocol + '//' +
//             window.location.host + window.location.pathname +
//             '?roomID=' +
//             roomID,
//         },
//       ],
//       scenario: {
//         mode: ZegoUIKitPrebuilt.VideoConference,
//       },
//     })

//   }

//   return (
//     <div
//       className="myCallContainer"
//       ref={myMeeting}
//       style={{ width: '100vw', height: '100vh' }}
//     >
//     </div>
//   );
// }

// export default Room


import React from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { AppRootState } from '../../redux/store';
import { useSelector } from 'react-redux';

const Room = () => {
  const { roomID = "1" } = useParams()
  const { userName = 'name', userEmail = 'email' } = useSelector((state: AppRootState) => state.user)

  function randomID(len: any) {
    let result = '';
    if (result) return result;
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }

  const myMeeting = async (element: any) => {
    const appID = 462463171
    const serverSecret = "185d580a5d35139557e75a407bbec3e7"
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), userName);

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Personal link',
          url:
            window.location.protocol + '//' +
            window.location.host + window.location.pathname +
            '?roomID=' +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    })

  }

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    >
    </div>
  );
}

export default Room