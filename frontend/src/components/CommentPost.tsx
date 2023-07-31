import { useState, ChangeEvent } from 'react';
const accessToken = localStorage.getItem("accessToken");


interface Comments {

    event_id?: number;
    text: string;

}


interface Props {
    event_id: number | undefined
}


const getAuthHeaders = () => {
    const accessToken = localStorage.getItem("accessToken")
    const headers = accessToken ? { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` } : { "Content-Type": "application/json" }

    return headers as HeadersInit
};

function CommentPost(props: Props) {
    const { event_id } = props
    const [newComment, setNewComment] = useState<Comments>({ event_id: event_id, text: "" });
    const { text } = newComment;

    const postComment = async (commentData: Comments) => {
        const response = await fetch(`/api/comments/`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(commentData)
        });
        return response
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewComment(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className='comment-input'>
            <div>
                <label className='label'>Comment</label>
                <input
                    className='input'
                    type="text"
                    placeholder='text'
                    name='text'
                    value={text}
                    onChange={handleInputChange}
                />

                <button className='button' onClick={() => postComment(newComment)}>Save comment</button>
            </div>
        </div>
    );
}

export default CommentPost;
