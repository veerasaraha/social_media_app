import { useContext, useRef, useState } from 'react'
import axios from 'axios'
import { PermMedia, Label, Room, EmojiEmotions } from '@material-ui/icons'
import './Share.css'
import { AuthContext } from '../../context/AuthContext'

const Share = () => {
  const { user } = useContext(AuthContext)
  const { profilePicture, username } = user
  const description = useRef()
  const [file, setFile] = useState(null)
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER
  const API_URL = process.env.REACT_APP_API_URL

  const submitHandler = async (e) => {
    e.preventDefault()
    const newPost = {
      userId: user._id,
      description: description.current.value,
    }

    if (file) {
      const data = new FormData()
      const fileName = Date.now() + file.name
      data.append('name', fileName)
      data.append('file', file)
      newPost.img = fileName

      try {
        await axios.post(`${API_URL}/api/upload`, data)
      } catch (error) {
        console.log(error)
      }
    }

    try {
      await axios.post(`${API_URL}/api/posts`, newPost)

      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='share'>
      <div className='shareWrapper'>
        <div className='shareTop'>
          <img
            className='shareProfileImg'
            src={
              profilePicture
                ? publicFolder + profilePicture
                : publicFolder + '/person/noAvatar.png'
            }
            alt=''
          />
          <input
            className='shareInput'
            placeholder={`What's in your mind ${username} ?`}
            type='text'
            ref={description}
          />
        </div>
        <hr className='shareHr' />
        <form className='shareBottom' onSubmit={submitHandler}>
          <div className='shareOptions'>
            <label htmlFor='file' className='shareOption'>
              <PermMedia htmlColor='tomato' className='shareIcon' />
              <span className='shareOptionText'>Photo</span>
              <input
                style={{ display: 'none' }}
                type='file'
                name='file'
                id='file'
                accept='.png,.jpeg,.jpg'
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>

            <div className='shareOption'>
              <Label htmlColor='blue' className='shareIcon' />
              <span className='shareOptionText'>Tag</span>
            </div>

            <div className='shareOption'>
              <Room htmlColor='green' className='shareIcon' />
              <span className='shareOptionText'>Location</span>
            </div>

            <div className='shareOption'>
              <EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
              <span className='shareOptionText'>Feelings</span>
            </div>
          </div>
          <button type='submit' className='shareButton'>
            Share
          </button>
        </form>
      </div>
    </div>
  )
}

export default Share
