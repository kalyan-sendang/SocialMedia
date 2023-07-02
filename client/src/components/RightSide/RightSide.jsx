import React, { useState } from 'react'
import './RightSide.css'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'
import { UilSetting } from '@iconscout/react-unicons'
import TrendCard from '../TrendCard/TrendCard'
import ShareModel from '../ShareModel/ShareModel'
import { Link } from 'react-router-dom'

function Rightside() {
    const [modalOpened, setModalOpened] = useState(false)
    return (
        <div className='RightSide'>
            <div className='navIcons'>
                <Link to='../home'>
                    <img src={Home} alt="" />
                </Link>
                <UilSetting />
                <img src={Noti} alt='' />
                <Link to='../chat'>
                    <img src={Comment} alt='' />
                </Link>
            </div>
            <TrendCard />

            <button className='button r-btn'
                onClick={() =>
                    setModalOpened(true)}>
                Share
            </button>
            <ShareModel modalOpened={modalOpened}
                setModalOpened={setModalOpened} />
        </div>
    )
}

export default Rightside