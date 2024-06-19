import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { UserState } from "../recoil/RecoilState";

function Following() {
    const [following, setFollowing] = useState([]);
    const loggedInUser = useRecoilValue(UserState);

    useEffect(() => {
        const fetchFollowing = async () => {
            try {
                const response = await axios.get(`/user/${loggedInUser.id}/following`);
                setFollowing(response.data);
            } catch (error) {
                console.error("팔로우 목록을 가져오는 중 오류 발생:", error);
            }
        };

        fetchFollowing();
    }, [loggedInUser.id]);

    return (
        <div>
            <h2>팔로잉 페이지</h2>
            {following.length > 0 ? (
                <ul>
                    {following.map((follow) => (
                        <li key={follow.id}>
                            ID: {follow.id}, 닉네임: {follow.username}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>팔로우한 사용자가 없습니다.</p>
            )}
        </div>
    );
}

export default Following;
