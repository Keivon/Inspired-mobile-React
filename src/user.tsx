import * as React from 'react';
import { UserContext, UserType } from './App'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        layout: {

            paddingTop: '24vh',
            textAlign: 'center',
            backgroundColor: 'cornsilk',
            paddingBottom: '24vh',


        },
        paper: {

            border: '2px solid black',
            padding: theme.spacing(15),
            display: 'inline-block',
        },


    }));

const User: React.FC = () => {
    const classes = useStyles();
    const [text, setText] = React.useState('');
    const [note, setnote] = React.useState('');
    const [dele, setdele] = React.useState(0);
    const [item, setitem] = React.useState<UserType>({ id: 4, title: 'Ted' })
    const usercontext = React.useContext(UserContext);

    const adduser = () => {
        usercontext.userDispatch({ type: 'ADD_USER', title: text });
        Ramdomitem(text);
        setdele(item.id + 1);
        setnote(`User ${text} has been added `);
        setText('');
    };

    const deleteuser = (id: number) => {
        usercontext.userDispatch({ type: 'DELETE_USER', id });
        setdele(id + 1);
        Ramdomitem();
        setnote(`User ${item.title} has been deleted `);
        setText('');
    };

    const [lastindex, setlastindex] = React.useState(0);



    const Ramdomitem = (title?: string) => {
        if (title) {
            return usercontext.userState.users[Math.floor(Math.random() * usercontext.userState.users.length)]
        } else {
            const result = usercontext.userState.users.filter((user: UserType) => user.id != item.id)
            let num = Math.floor(Math.random() * result.length);
            setlastindex(num);
            return result[lastindex];
        }


    }
    const onClick = () => {
        setitem(Ramdomitem());
    };

    React.useEffect(() => {

        if (dele) {
            const timer = setTimeout(() => {
                setnote("");
            }, 5000);



            return () => clearTimeout(timer);
        }
    }, [dele]);



    return (
        <div className={classes.layout}>
            <div className={classes.paper} >
                <div>
                    <h2>{item.title}</h2>
                </div>
                <div>
                    <input
                        required={true}
                        value={text}
                        placeholder="Enter a name"
                        onChange={e => setText(e.target.value)}
                    />
                    <button onClick={adduser} >Add user</button>
                </div>
                <div>
                    <button onClick={onClick}>Ramdom User</button>

                    <button onClick={() => { deleteuser(item.id) }}>Delete User</button>
                </div>
                <label>{note}</label>
            </div>

        </div>
    )
};


export default User;
