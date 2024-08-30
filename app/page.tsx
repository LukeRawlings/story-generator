'use client'
import { useRouter } from 'next/navigation';

export default function HomePage() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/generate-story');
    };

    return (
        <main>
            <h2>Click here to begin:</h2>
            <button onClick={handleClick}>
                Let's go!
            </button>
        </main>
    );
}