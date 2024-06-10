import Header from './Header';
import Content from './Content';

const Note = ({note}) => {
    return (
        <li>{note.content}</li>
    )

    /*
    return (
        <div>
            <Content content={props.note} />
        </div>
    )
    */

}

export default Note;

