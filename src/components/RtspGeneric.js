import React, { useEffect, useRef, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

const RtspGeneric = ({clearTileState, device, tile, useRtsp, useRtspPlayStream}) => {

    const device_state = useSelector(state => state.DeviceController.data[tile.id], shallowEqual) || {}
    const video_ref = useRef(null)
    const dispatch = useDispatch()
    
    useRtsp(device.id, tile.id)    
    useRtspPlayStream(device_state.stream_ready, video_ref, device.id)

    useEffect(() => {
        return () => {
            dispatch(clearTileState(tile.id))
            setStreamReady(false)
        }
    }, [])

    if(device_state.error) {
        return <div className="center_container">
            <div className="center_inner">
                <p>Error: {device_state.message}</p>
            </div>
        </div>
    }

    if(!device_state.stream_ready) {
        return <div className="center_container">
            <div className="center_inner">
                <div className="button_loader button_loader_l"></div>
                <p>Loading Stream...</p>
            </div>
        </div>
    }

    return <video
        ref={video_ref}
        autoPlay={true}
        muted={true}
        controls={true}
        width="100%"
        height="auto" />
}

export default RtspGeneric