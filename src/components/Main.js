import {useState, useEffect} from 'react'
import styled from "styled-components";
import { InsertPhotoRounded,  
          DuoRounded, 
          ThumbUpAltOutlined, 
          EventAvailableRounded, 
          AssignmentRounded, 
          ThumbUpAltRounded, 
          SmsOutlined, 
          SendRounded,
          Share,
          MoreHorizRounded
} from "@material-ui/icons"
import { Avatar, CircularProgress } from "@material-ui/core"
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"
import PostModal from "./PostModal"
import { getArticleAPI } from "../actions"
import ReactPlayer from "react-player"

function Main(props) {
  const [showModal, setShowModal] = useState("close")

  useEffect(() => {
    props.getArticles();
  }, [])

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    

    switch (showModal) {
      case "open":
        setShowModal("close")
        break;
      case "close":
        setShowModal("open")
        break;
      default:
        setShowModal("close")
        break; 
    }
  }
  return (
    <div>
      {
        props.articles.length === 0 ? 
        <p>There are om Articles at the moment</p>
        : (
      <Container>
        {!props.user && <Redirect to="/" />}
        <ShareBox>    
            <ShareBoxSectionOne>
            { props.user && props.user.photoURL ?
              <Avatar src={props.user.photoURL} /> : <Avatar src="" />
            }
              <button disabled={props.loading ? true : false} onClick={handleClick}>Create a Post</button>

            </ShareBoxSectionOne>
          <ShareBoxSectionTwo>
            <ul>
              <li>
                <InsertPhotoRounded />
                <span>Photo</span>
              </li>
              <li>
                <DuoRounded />
                <span>Video</span>
              </li>
              <li>
                <EventAvailableRounded />
                <span>Event</span>
              </li>
              <li>
                <AssignmentRounded />
                <span>Write Article</span>
              </li>
            </ul>
          </ShareBoxSectionTwo>
        </ShareBox>
        <Content>
          {props.loading && <CircularProgress /> }
          

          {props.articles.length !== 0 && 
          props.articles.map((article, key) => {
            return(
<Article key={key}>
              {console.log(article)}
            <ShareActor>
              <ShareActorHeader>
                <a>
                  {
                    article.actor.image ? <img src={article.actor.image}  alt=""/> : (
                      <img src="images/user.svg" alt="author img" />
                    )
                  }
                </a>
                <div>

                  <p>{article.actor.title}</p>
                  <p>{article.actor.description}</p>
                  <p>{article.actor.date.toDate().toLocaleDateString()}</p>
                </div>
                <span>
                  <MoreHorizRounded />
                </span>
              </ShareActorHeader>
              <ShareActorDescription>
                <p>{article.description}</p>
              </ShareActorDescription>
              <ShareActorImg>
                <div className="article__img_container">
                  {
                    article.sharedImg ? (
                      <img src={article.sharedImg} alt="Article" />
                    ) : article.video && (
                      <ReactPlayer width={"100%"} url={article.video} />
                    )
                  }
                  
                </div> 
                <div className="reaction_target_container">
                  <span>
                    <ThumbUpAltRounded /> 75
                  </span>
                  <span>
                    0 comments
                  </span>
                </div>
                {/* The like(Reaction would be here also) */}
              </ShareActorImg>

              <ShareActorFooter>
                <button><ThumbUpAltOutlined /> <span>Like</span></button>
                <button><SmsOutlined /> <span>Comment</span></button>
                <button><Share /> <span>Share</span></button>
                <button><SendRounded /> <span>Send</span></button>
              </ShareActorFooter>
            </ShareActor>
          </Article>
            )
          })}
        </Content>
        <PostModal showModal={ showModal } handleClick={handleClick}/>
      </Container>
        )
    }
    </div>
  )
}

const Container = styled.div`
  grid-area: main;
`;
const Content = styled.div`
  text-align: center;

  & > img {
    width: 30px;
  }
`
const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 /15%), 0 0 0 rgb(0 0 0 /20%);

`

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
`

const ShareBoxSectionOne = styled.div`
  margin: 10px;
  padding: 3px;
  display: flex;

  .MuiAvatar-root {
    margin-right: 10px;
  }

  button {
    text-transform: initial;
    margin: 4px 0;
    flex-grow: 1;
    padding-left: 16px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 35px;
    background-color: #fff;
    text-align: left;!
  }
`

const ShareBoxSectionTwo = styled.div`
  ul {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-around;

  }
  &:first-child {
    .MuiSvgIcon-root {
      color: #70b5f9;
    }
  }

  &:nth-child(2){
    .MuiSvgIcon-root {
      color: #70b5f9;
    }
  }

  &:nth-child(3){
    .MuiSvgIcon-root {
      color: #70b5f9;
    }
  }

  &:nth-child(4){
    .MuiSvgIcon-root {
      color: #70b5f9;
    }
  }
  li {
    
    font-size: 14px;
    line-height: 1.5;
    min-height: 48px;
    background: transparent;
    border: none;
    display: flex;
    padding: 4px;
    align-items: center;
    font-weight: 600;

    .MuiSvgIcon-root {
      margin-right: 5px;
    }

    span {
      color: #70b5f9;
    }
  }

`

const Article = styled(CommonCard)`
  padding: 0px;
  margin: 0 0 8px;
  overflow: visible;
`

const ShareActor = styled.div`

`

const ShareActorHeader = styled.div`
  display: flex;
  padding-right: 40px;
  flex-wrap: no-wrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;

  a {
    margin-right: 12px;
    overflow: hidden;
    text-decoration: none;
  }
    img {
      width: 48px;
      height: 48px;
    }

  div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      text-align: left;

      p {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }

        &:nth-child(n+1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }

    }
   span {
     .MuiSvgIcon-root {
       position: absolute;
       top: 7px;
       right: 7px;
     }
   }
`


const ShareActorDescription = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`

const ShareActorImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }

  .reaction_target_container {
    padding: 10px;
    width: 100%;
    margin-top: 5px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    text-align: left;
    display: flex;
    align-items: center;
    font-size: 14px;

    span {
      margin-right: 15px;
    }
    .MuiSvgIcon-root {
      font-size: 14px;
    }

  }
`

const ShareActorFooter = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;

  button {
    display: inline-flex;
    align-items: center;
    padding: 4px;
    margin-right: 5px;
    color: #0a66c2;
    border: 1px solid rgba(0, 0, 0, 0.3);

    @media (min-width: 768px) {
      span {
        margin-left: 4px;
      }
    }
  }

`



const mapStateToProps = (state) => {
  return {
    loading: state.userState.loading,
    user: state.userState.user,
    articles: state.articleState.articles
  }
}

const mapDispatchToProps = dispatch =>({
  getArticles: () => dispatch(getArticleAPI())
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)


