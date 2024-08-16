import type { Metadata } from 'next';
import './globals.css';
import Image from 'next/image';
import { GeistMono } from 'geist/font/mono';
import { cn } from '@/utils';

export const metadata: Metadata = {
  title: 'Inova Assistance - AI Chatbot Demo',
  description: 'AI Chatbot for Inova Assistance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'bg-gradient-to-tl from-green-200  h-screen w-screen',
          `${GeistMono.className}`
        )}
      >
        <div className="sm:p-10 px-6 pt-14 absolute top-0 left-0">
          {/* <Image
            src="/inovalogga2.png"
            alt="logo"
            width={150}
            height={150}
            className=""
          /> */}
          <div className="prose">
            <h2 className="font-bold text-md ">
              Intressebevakaren - AI-Powered Assistance for Stakeholders Demo
            </h2>
            <h2 className="text-sm font-semibold mt-2">Features</h2>
            <ul className="list-disc ml-4 text-xs">
              <li>Vector embedding for semantic search from knowledge base</li>
              <li>
                Integration of Innova Assistance data from the entire website
              </li>
              <li>Ability to add as much as custom knowledge to the system</li>
              <li>Multiple language support</li>
              <li>Voice input and output</li>
              <li>Tailored responses for every query</li>
            </ul>
            <h2 className="text-sm font-semibold mt-2">AI Models</h2>
            <ul className="list-disc ml-4 text-xs">
              <li>
                AI Response - {''}
                <a
                  href="https://openai.com/index/gpt-4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  OpenAI GPT
                </a>
              </li>
              <li>
                Vector Embedding - {''}
                <a
                  href="https://openai.com/index/new-embedding-models-and-api-updates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Text-embedding-3-large
                </a>
              </li>
              <li>
                Text-to-speech - {''}
                <a
                  href="https://platform.openai.com/docs/guides/text-to-speech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  OpenAI TTS
                </a>
              </li>
              <li>
                Speech recognition - {''}
                <a
                  href="https://github.com/openai/whisper"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  OpenAI Wishper
                </a>
              </li>
            </ul>
            <h2 className="text-sm font-semibold mt-2">Stack</h2>
            <ul className="list-disc ml-4 text-xs">
              <li>
                <a
                  href="https://nextjs.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Nextjs/React
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindcss.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  TailwindCSS
                </a>
              </li>
            </ul>
            <h2 className="text-xs mt-4">
              Start by clicking on the <strong>chatbot icon</strong> on the
              bottom right.
            </h2>
            <h2 className="text-xs italic text-neutral-400 mt-1">
              <strong>Note:</strong> Voice recognition not supported on{' '}
              <strong>iOS mobile devices</strong> currently.
            </h2>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
