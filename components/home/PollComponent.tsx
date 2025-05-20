'use client'
import { useState } from 'react'
import InputChoice from './InputChoice'

import { useAddPostContext } from '@/context/AddPostContext'
import SelectInput from './SelectInput'

const PollComponent = () => {
  const [inputsCount, setInputsCount] = useState<number>(2)
  const { setIsPoll } = useAddPostContext()
  return (
    <div className="border-border border-[1px] rounded-lg   ">
      <div className="flex flex-col gap-4 border-b-[1px] border-b-border p-3">
        {Array.from({ length: inputsCount }).map((_, i) => (
          <InputChoice
            i={i}
            key={i}
            inputsCount={inputsCount}
            setInputsCount={setInputsCount}
          />
        ))}
      </div>

      <div className="border-b-border border-b-[1px]">
        <p className="mt-2 mx-2">Poll length</p>
        <div className="grid grid-cols-3 gap-6 mx-2 mb-3 mt-1">
          <SelectInput
            label="Days"
            options={Array.from({ length: 7 }, (_, index) => index)}
          />
          <SelectInput
            label="Hours"
            options={Array.from({ length: 24 }, (_, index) => index)}
          />
          <SelectInput
            label="Minutes"
            options={Array.from({ length: 60 }, (_, index) => index)}
          />
        </div>
      </div>
      <div
        className="flex justify-center items-center p-3 rounded-b-md text-red-600 hover:bg-red-500/10 transition-all duration-100 cursor-pointer"
        onClick={() => setIsPoll(false)}
      >
        Remove poll
      </div>
    </div>
  )
}

export default PollComponent
