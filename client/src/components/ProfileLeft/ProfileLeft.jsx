import React from 'react'
import '../profileSide/ProfileSide.css'
import FollowersCard from '../FollowersCard/FollowersCard'
import LogoSearch from "../LogoSearch/LogoSearch"
import InfoCard from '../InfoCard/InfoCard'
const ProfileLeft = () => {
    return (
        <div className='ProfileSide'>
            <LogoSearch />
            <InfoCard />
            <FollowersCard />
        </div>
    )
}

export default ProfileLeft