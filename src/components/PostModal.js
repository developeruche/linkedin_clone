import styled from "styled-components"
import { CloseRounded, AddAPhotoRounded, VideoLabelRounded, SmsOutlined } from "@material-ui/icons"
import {useState} from "react"
import ReactPlayer from "react-player";
import {connect} from "react-redux"
import firebase from "firebase"
import {postArticleAPI} from "../actions"


function PostModal(props){
    const [editorText, setEditorText] = useState("")
    const [shareImage, setShareImage] = useState("")
    const [videoLink, setVideoLink] = useState("")
    const [assetArea, setAssetArea] = useState("")

    const handleChange = (e) => {
        const image = e.target.files[0];

        if (image === "" || image===undefined) {
            alert(`Not an image the image file is a ${typeof image}`)
            return 
        }

        setShareImage(image) 
    }

    const switchAssetArea = area => {
        setShareImage("")
        setVideoLink("")
        setAssetArea(area)
    }

    const postArticle = (e) => {
        e.preventDefault();
        if (e.target !== e.currentTarget) {
            return
        }
        const payload = {
            image: shareImage,
            video: videoLink,
            user: props.user,
            description: editorText,
            timestamp: firebase.firestore.Timestamp.now()
        }

        props.postArticle(payload)
        reset(e)
    }
    const reset = (e) => {
        setEditorText("");
        setShareImage("")
        setVideoLink("")
        setAssetArea("")
        props.handleClick(e);
    }
    return (
        <>
        {
            props.showModal === "open" && 
        <Container>
            <Content>
                <Header>
                    <h2>
                        Create a Post
                    </h2>
                    <button onClick={(e) => reset(e)}>
                        <CloseRounded />
                    </button>
                </Header>
                <ShareContent>
                    <UserInfo>
                        {
                            props.user.photoURL ? (
                                <img src={props.user.photoURL} alt="profile user" />
                            ) : (
                                <img src="/images/user.svg" alt="user" />
                            )
                        }
                        <span>{props.user.displayName}</span>
                    </UserInfo>
                    <Editor>
                        <textarea 
                            value={editorText}
                            onChange={(e) => setEditorText(e.target.value)}
                            placeholder="what do you what to write about"
                            autofocus={true}
                        ></textarea>
                        <>
                        {
                            assetArea === 'image' ? (
                                <UploadImage>
                                    <input 
                                        type="file" 
                                        accept="image/gif, image/jpeg, image/png" 
                                        name="image"
                                        id="file"
                                        style={{display: "none"}}
                                        onChange={handleChange}
                                    />
                                    <p>
                                        <label htmlFor="file">Select an Image</label>
                                    </p>
                                    {
                                        shareImage && <img src={URL.createObjectURL(shareImage)} />
                                    }
                                </UploadImage> 
                            )
                            : assetArea === 'media' && (
                                <>
                                    <input 
                                    type="text"
                                    placeholder="Please input a video link"
                                    value={videoLink}
                                    onChange={e => setVideoLink(e.target.value)} />

                                    {
                                        videoLink && (<ReactPlayer width={"100%"} url={videoLink} />)
                                    }
                                </>
                                    
                            
                            )
                        }
                        </>
              </Editor>
                </ShareContent>
                <SharedCreation>
                    <AttachAsset>
                        <AssetButton onClick={() => switchAssetArea("image")}>
                            <AddAPhotoRounded />
                        </AssetButton>
                        <AssetButton onClick={() => switchAssetArea("media")}>
                            <VideoLabelRounded />
                        </AssetButton>
                    </AttachAsset>
                    <ShareComment>
                        <AssetButton>
                            <SmsOutlined />
                        </AssetButton>
                    </ShareComment>
                    <PostButton 
                        disabled={!editorText ? true : false}
                        onClick={(e) => postArticle(e)}    
                    >Post</PostButton>
                </SharedCreation>
            </Content>
        </Container>
        }
    </>
    )
}


// This are the coda for the styled component (Literially)
const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.7);
    color: rgba(0, 0, 0, 1);
    animation: fadeIn 0.3s;
 

`

const Content = styled.div`
    width: 100%auto;
    max-width: 568px;
    background-color: #fff;
    max-height: 90%;
    overflow: initial;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    top: 32px;
    margin: 0 auto;
`

const Header = styled.div`
    padding: 16px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.6);
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
        color: rgba(0, 0, 0, 0.8);
        border: 1px solid rgba(0, 0, 0, 0.3);
        background-color: rgba(0, 0, 0, 0.1))
        border-radius: 2px;
        min-width: auto;
    }
    .MuiSvgIcon-root {
        pointer-events: none;
    }
`

const ShareContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    vertical-align: baseline;
    background: transparent;
    padding: 8px 12px;

` 

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 24px;

    img {
        width: 44px;
        height: 44px;
        background-clip: content-box;
        border: 2px solid transparent;
        border-radius: 999px;
    }

    span {
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
        margin-left: 5px;
    }
`

const SharedCreation = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 24px 12px 16px;

`

const AttachAsset = styled.div`
    align-items: center;
    display: flex;
    padding-right: 8px;
`

const AssetButton = styled.button`
    display: flex;
    align-items: center;
    height: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.5)
`

const ShareComment = styled.div`
    padding-left: 8px;
    margin-left: auto;
    border-left: 1px solid rgba(0, 0, 0, 0.15);
    ${AssetButton} {
        .MuiSvgIcon-root {
            margin-right: 5px;
        }
    }
`

const PostButton = styled.button`
    min-width: 60px;
    border-radius: 25px;
    padding-left: 16px;
    padding-right: 16px;
    background: ${(props) => (props.disabled ? "rgba(0, 0, 0, 0.8)" : "#0a66c2")};
    color: white;
    &:hover {
        background: #004182;
    }
`

const Editor = styled.div`
    padding: 12px 24px;
    textarea {
        width: 100%;
        min-height: 200px;
        resize: none;

    }
    input {
        width: 100%;
        height: 35px;
        font-size: 16px;
        margin-bottom: 20px;

    }
`

const UploadImage = styled.div`
    text-align: center;

    img {
        width: 100%;
    }
`

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    }
};

const mapDispatchToProps = dispatch => ({
    postArticle: payload => dispatch(postArticleAPI(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostModal)