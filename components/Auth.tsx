import * as React from 'react'

/*
    IMPORTANT: This method of doing authentication is by NO means SECURE.
    It is only meant to make sure that users don't vote twice on accident.
    This service is designed to be used in a home network where the end
    users are trusted so for this use case it is considered good enough.
*/

export function useAuth() {
    if (typeof localStorage === "undefined") {
        return ["00"]
    }
    const [data, setData] = React.useState(localStorage.getItem("authToken"));
    if (data == null) {
        React.useEffect(() => {
            fetch('/api/IP')
                .then((res) => res.text())
                .then((ip) => {
                    const encoder = new TextEncoder()
                    const encodedIp = encoder.encode(ip)
                    return crypto.subtle.digest("SHA-1", encodedIp)
                }).then((authToken) => {
                    // Convert auth token to hex string
                    const hashArray = Array.from(new Uint8Array(authToken)); // convert buffer to byte array
                    const hashHex = hashArray
                        .map((b) => b.toString(16).padStart(2, "0"))
                        .join(""); // convert bytes to hex string

                    localStorage.setItem("authToken", hashHex)
                    setData(hashHex)
                });
        }, []);

        return [data];
    }

    return [data]
}