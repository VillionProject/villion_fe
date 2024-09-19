import React from 'react';
import {useSelector} from "react-redux";

const Location = () => {

        const userInfo = useSelector(state => state.loginCheck.loginInfo);

        const sendLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    const lat = position.coords.latitude;
                    const lon = position.coords.latitude;

                    // 위치 정보를 콘솔에 출력
                    console.log("Latitude:", lat);
                    console.log("Longitude:", lon);

                    // 위치 정보를 서버에 전송
                    fetch(`http://localhost:8000/api/v1/user/${userInfo.userId}/location`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            latitude: lat,
                            longitude: lon,
                        }),
                    })
                        .then(response => response.text())
                        .then(data => {
                            console.log("Location sent to server:", data);
                        })
                        .catch(error => {
                            console.error("Error:", error);
                        });
                });
            } else {
                console.log("Geolocation is not supported by this browser.");
            }
        };

        return (
            <div>
                <h1>Geolocation Example</h1>
                <button onClick={sendLocation}>Send Location to Server</button>
            </div>
        );
};

export default Location;
