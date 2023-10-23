"use client";

interface ErrorPageProps{
    error: Error,
    reset: () => void
}

export default function UnkownErrorPage({error, reset}: ErrorPageProps) {
    return <div>UNKNOWN ERROR OCCURED.</div>
}