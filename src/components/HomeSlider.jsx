import React from 'react'
import {Slider} from "../components"
import {motion} from "framer-motion"

const HomeSlider = () => {
  return (
    <motion.div className='w-full flex items-center justify-start flex-col'>
        <div className='w-full flex items-center justify-between'>
            <div className='flex flex-col items-start justify-start gap-1'>
            <p className='text-2xl text-headingColor font-bold'>Fresh and Healthy Fruits</p>
            <div className='w-40 h-1 rounded-md bg-orange-500'></div>
            </div>
        </div>
   <Slider/>
    </motion.div>
  )
}

export default HomeSlider