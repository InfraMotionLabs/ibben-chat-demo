'use client';

import { AudioComponent } from '@/components/AudioComponent';
import ChatbotIcon from '@/components/ChatbotIcon';
import CloseIcon from '@/components/CloseIcon';
import { Message, useAssistant } from 'ai/react';
import { useState, useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { GeistSans } from 'geist/font/sans';
import { cn } from '@/utils';
import speechResponse from '@/components/seechResponse';

export default function Chatbot() {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const { toggleRecording, text, isRecording } = AudioComponent();
  const [audioUrl, setAudioUrl] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);

  const { status, append, messages, input, submitMessage, handleInputChange } =
    useAssistant({ api: '/api/assistant' });

  const handleChatbotClick = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  useEffect(() => {
    console.log('text', text);
    if (text && text.trim() !== '') {
      append({
        role: 'user',
        content: text,
      });
    }
  }, [text]);

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.load();
      audioRef.current
        .play()
        .catch((error) => console.error('Playback failed', error));
    }
  }, [audioUrl]);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  // const getAudio = async ({ content }: { content: string }) => {
  //   const audio = await speechResponse({ data: content });
  //   console.log('audio', audio);
  //   const audioBlob = new Blob(
  //     [Uint8Array.from(atob(audio), (c) => c.charCodeAt(0))],
  //     { type: 'audio/mpeg' }
  //   );
  //   const audioUrl = URL.createObjectURL(audioBlob);
  //   setAudioUrl(audioUrl);
  // };

  // useEffect(() => {
  //   if (messages && voiceMode && status !== 'in_progress') {
  //     const latestAssistantMessage = messages.findLast(
  //       (m) => m.role === 'assistant'
  //     );
  //     console.log('getAudio', latestAssistantMessage);
  //     if (latestAssistantMessage) {
  //       getAudio({ content: latestAssistantMessage.content });
  //     }
  //   }
  // }, [messages, voiceMode, status]);

  return (
    <div className="absolute sm:bottom-10 sm:right-10 bottom-4 right-2 flex flex-col-reverse items-end z-10 sm:pl-0 pl-2">
      <ChatbotIcon
        handleChatbotClick={handleChatbotClick}
        isChatbotOpen={isChatbotOpen}
      />

      <div
        className={cn(
          'h-auto rounded-2xl border-neutral-300 transition-transform duration-200 ease-out text-sm shadow-md shadow-neutral-700/40 mb-2 border flex flex-col overflow-hidden w-full',
          !isChatbotOpen ? 'translate-y-0' : 'translate-y-[100vh]'
        )}
      >
        <CloseIcon handleChatbotClick={handleChatbotClick} />

        <div
          className={cn(
            'h-[85svh] sm:w-[40vw] w-full flex flex-col justify-end relative',
            GeistSans.className
          )}
        >
          <div className="bg-neutral-50 relative h-auto flex-grow w-full flex flex-col p-4 space-y-2 overflow-y-scroll">
            {/* <div className="flex-row  gap-3 flex">
              <input
                type="checkbox"
                checked={voiceMode}
                onChange={() => setVoiceMode(!voiceMode)}
                className="toggle-checkbox"
              />
              <label className="toggle-label">
                {voiceMode ? 'Voice Mode On' : 'Voice Mode Off'}
              </label>
            </div> */}
            {/* <button
              onClick={() => setVoiceMode(!voiceMode)}
              className={cn(
                'h-6 w-8 absolute right-3 text-neutral-500 top-10 border rounded-full flex items-center justify-center',
                voiceMode ? 'bg-green-500' : 'bg-neutral-500'
              )}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 56 56"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M26 49.451c1.581 0 2.721-1.163 2.721-2.721V9.637c0-1.558-1.14-2.86-2.767-2.86c-1.14 0-1.907.511-3.14 1.674l-10.256 9.698a.911.911 0 0 1-.604.209H5.046C1.768 18.358 0 20.148 0 23.637v9.023c0 3.489 1.767 5.28 5.047 5.28h6.907c.232 0 .441.07.604.209l10.256 9.79c1.116 1.047 2.046 1.512 3.186 1.512m22.489-4.744c.906.604 2.023.372 2.674-.558c3.07-4.28 4.837-9.977 4.837-15.93c0-5.977-1.744-11.675-4.837-15.954c-.674-.907-1.768-1.14-2.674-.535c-.884.605-1.024 1.744-.326 2.744c2.535 3.721 4.093 8.605 4.093 13.744c0 5.14-1.512 10.07-4.117 13.745c-.65 1-.534 2.14.35 2.744m-9.28-6.28c.791.559 1.93.373 2.605-.534c1.814-2.442 2.907-6.024 2.907-9.675c0-3.65-1.116-7.209-2.907-9.697c-.674-.907-1.79-1.093-2.605-.535c-1.023.674-1.14 1.86-.395 2.883c1.349 1.814 2.163 4.582 2.163 7.35c0 2.767-.86 5.534-2.186 7.371c-.698 1-.582 2.14.418 2.838"
                />
              </svg>
            </button> */}
            {/* <div className="w-4/5">
              <p className="px-2 py-1 prose bg-neutral-200 border text-sm w-fit border-neutral-300 rounded-lg text-pretty">
                Hej! Hur kan jag hjälpa dig idag?
              </p>
            </div> */}
            {messages.map((m: Message) =>
              m.role === 'assistant' ? (
                <div key={m.id} className="w-4/5">
                  <div className="px-2 py-1 prose bg-neutral-200 border text-sm w-fit border-neutral-300 rounded-lg text-pretty">
                    <Markdown remarkPlugins={[remarkGfm]}>{m.content}</Markdown>
                  </div>
                </div>
              ) : (
                <div key={m.id} className="self-end flex justify-end w-4/5">
                  <p className="px-2 py-1 bg-white border border-neutral-300 rounded-lg w-fit">
                    {m.content}
                  </p>
                </div>
              )
            )}
            {status === 'in_progress' && (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="18" cy="12" r="0" fill="currentColor">
                  <animate
                    attributeName="r"
                    begin=".67"
                    calcMode="spline"
                    dur="1.5s"
                    keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                    repeatCount="indefinite"
                    values="0;2;0;0"
                  />
                </circle>
                <circle cx="12" cy="12" r="0" fill="currentColor">
                  <animate
                    attributeName="r"
                    begin=".33"
                    calcMode="spline"
                    dur="1.5s"
                    keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                    repeatCount="indefinite"
                    values="0;2;0;0"
                  />
                </circle>
                <circle cx="6" cy="12" r="0" fill="currentColor">
                  <animate
                    attributeName="r"
                    begin="0"
                    calcMode="spline"
                    dur="1.5s"
                    keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                    repeatCount="indefinite"
                    values="0;2;0;0"
                  />
                </circle>
              </svg>
            )}
            <div ref={messagesEndRef}></div>
            <audio
              className="absolute hidden"
              ref={audioRef}
              controls
              src={audioUrl}
              onPlay={() => setIsPlaying(true)}
              onEnded={() => setIsPlaying(false)}
            />
          </div>

          <div className="p-2 bg-neutral-100 relative border-neutral-300 transition-transform duration-100 border-t w-full flex flex-col items-end ">
            {isPlaying && (
              <div className="group">
                <div className="absolute w-6 h-6 animate-pulse group-hover:hidden flex items-center justify-center left-3 z-10 rounded-full bg-neutral-800 top-3 text-white">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2 10v3m4-7v11m4-14v18m4-13v7m4-10v13m4-8v3"
                    />
                  </svg>
                </div>
                <button
                  onClick={stopAudio}
                  className="absolute w-6 h-6 group-hover:flex hidden items-center justify-center left-3 z-10 rounded-full bg-neutral-white top-3 text-black"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="4"
                      d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m6 18a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2Z"
                    />
                  </svg>
                </button>
              </div>
            )}
            <form
              onSubmit={submitMessage}
              className="flex flex-row justify-between w-full gap-1 border-neutral-300"
            >
              <textarea
                className="w-full h-full min-h-10 bg-white border border-neutral-300 rounded-bl-lg rounded-md px-2 py-2"
                value={input}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    const form = e.currentTarget.form;
                    if (form) {
                      form.requestSubmit();
                    }
                  }
                }}
              />

              <button
                className="self-center text-neutral-500 sm:hover:text-white transition-colors duration-100 sm:hover:bg-green-500 rounded-md border flex items-center justify-center border-neutral-300 sm:w-12 sm:h-full h-10 w-12 bg-white p-1"
                disabled={status === 'in_progress'}
              >
                {status === 'in_progress' ? (
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="18" cy="12" r="0" fill="currentColor">
                      <animate
                        attributeName="r"
                        begin=".67"
                        calcMode="spline"
                        dur="1.5s"
                        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                        repeatCount="indefinite"
                        values="0;2;0;0"
                      />
                    </circle>
                    <circle cx="12" cy="12" r="0" fill="currentColor">
                      <animate
                        attributeName="r"
                        begin=".33"
                        calcMode="spline"
                        dur="1.5s"
                        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                        repeatCount="indefinite"
                        values="0;2;0;0"
                      />
                    </circle>
                    <circle cx="6" cy="12" r="0" fill="currentColor">
                      <animate
                        attributeName="r"
                        begin="0"
                        calcMode="spline"
                        dur="1.5s"
                        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                        repeatCount="indefinite"
                        values="0;2;0;0"
                      />
                    </circle>
                  </svg>
                ) : (
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M2.345 2.245a1 1 0 0 1 1.102-.14l18 9a1 1 0 0 1 0 1.79l-18 9a1 1 0 0 1-1.396-1.211L4.613 13H10a1 1 0 1 0 0-2H4.613L2.05 3.316a1 1 0 0 1 .294-1.071z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
              <div
                onClick={toggleRecording}
                className="self-center cursor-pointer text-neutral-500 sm:hover:text-white transition-colors duration-100  sm:hover:bg-green-500 rounded-br-lg rounded-md border overflow-hidden border-neutral-300 flex items-center justify-center bg-white sm:w-12 sm:h-full h-10 w-12"
              >
                {isRecording ? (
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="bg-green-500 w-full h-full p-1"
                  >
                    <path
                      fill="white"
                      d="M19 12c0 3.86-3.14 7-7 7s-7-3.14-7-7s3.14-7 7-7s7 3.14 7 7"
                    />
                  </svg>
                ) : (
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M12 14q-1.25 0-2.125-.875T9 11V5q0-1.25.875-2.125T12 2q1.25 0 2.125.875T15 5v6q0 1.25-.875 2.125T12 14m-1 7v-3.075q-2.6-.35-4.3-2.325T5 11h2q0 2.075 1.463 3.538T12 16q2.075 0 3.538-1.463T17 11h2q0 2.625-1.7 4.6T13 17.925V21z"
                    />
                  </svg>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
