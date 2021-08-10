import './Message.css'

const Message = ({ own }) => {
  return (
    <div className={own ? 'message own' : 'message'}>
      <div className='messageTop'>
        <img
          className='messageImg'
          src='https://image.freepik.com/free-photo/river-surrounded-by-forests-cloudy-sky-thuringia-germany_181624-30863.jpg'
          alt=''
        />
        <p className='messageText'>this is s message</p>
      </div>
      <div className='messageBottom'>1 hour ago</div>
    </div>
  )
}

export default Message
