'use client'

import { Message as MessageType } from '@/context/ChatContext'

export function Message({ message }: { message: MessageType }) {
  return (
    <div
      className={`mb-4 p-4 rounded-lg ${
        message.role === 'user'
          ? 'bg-blue-100 ml-12 text-blue-900'
          : 'bg-gray-100 mr-12 text-gray-900'
      }`}
    >
      <div className="text-sm font-medium mb-1">
        {message.role === 'user' ? 'You' : 'Assistant'}
      </div>
      <div className="whitespace-pre-wrap">{message.content}</div>
    </div>
  )
}