import { useEffect, useState } from 'react';
import CommentPost from "../components/CommentPost";



interface Comment {
    text: string;
    id: string;
}

interface Props{
    id : number | undefined
}

function CommentById(props: Props) {
   const {id} = props
    const [comments, setComments] = useState<Array<Comment | undefined>>([] as Comment[]);

    const getCommentsById = async (event_id: number | undefined) => {
            const response = await fetch(`/api/comments/eventId/${event_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
                return response.json() 
           
       
    };


    useEffect(() => {
        getCommentsById(id).then((res) => {
             setComments(res as any)})
           
    }, [id])

    return(
        <div>
        <CommentPost event_id={id}/>
        {comments && comments.map((comment) => <div className='textarea'>{comment ? comment.text : 'Loading...'}</div>)}
        </div>
    )
    
    
}

export default CommentById;
