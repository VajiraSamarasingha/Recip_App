import React from 'react'

export default function useGetUserId() {
    return window.localStorage.getItem("userID");
}
