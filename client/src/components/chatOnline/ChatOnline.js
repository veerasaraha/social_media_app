import './chatOnline.css'

const ChatOnline = () => {
  return (
    <div className='chatOnline'>
      <div className='chatOnlineFriend'>
        <div className='chatOnlineImgConatiner'>
          <img
            className='chatOnlineImg'
            src='https://image.freepik.com/free-photo/what-wonderful-news-portrait-enthusiastic-blond-girl-express-overjoy-surprised_176420-33367.jpg'
            alt=''
          />
          <div className='chatOnlineBadge'></div>
        </div>
        <div className='chatOnlineName'>John</div>
      </div>
    </div>
  )
}

export default ChatOnline
