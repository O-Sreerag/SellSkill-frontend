import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HostPanel = ({ roomID } : {
  roomID: string
}) => {
  const [joinRequests, setJoinRequests] = useState<{roomID: string, userName: string, userEmail: string}[]>([]);

  useEffect(() => {
    const fetchJoinRequests = async () => {
      try {
        const response = await axios.get(`/api/joinRequests?roomID=${roomID}`);
        setJoinRequests(response.data);
      } catch (error) {
        console.error('Failed to fetch join requests:', error);
      }
    };

    fetchJoinRequests();
  }, [roomID]);

  const approveJoin = async (userName: string, userEmail: string) => {
    try {
      await axios.post('/api/approveJoin', { roomID, userName, userEmail });
      // Update the local state to reflect the approval
      setJoinRequests(prev => prev.filter(request => request.userName !== userName));
    } catch (error) {
      console.error('Failed to approve join:', error);
    }
  };

  return (
    <div>
      <h2>Join Requests</h2>
      {joinRequests.map(request => (
        <div key={request.userName}>
          <span>{request.userName}</span>
          <button onClick={() => approveJoin(request.userName, request.userEmail)}>Approve</button>
        </div>
      ))}
    </div>
  );
};

export default HostPanel;
