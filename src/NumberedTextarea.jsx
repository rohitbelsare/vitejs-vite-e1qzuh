
// eslint-disable-next-line react/prop-types
const NumberedTextarea = ( { text = '', setText}) => {


    return (
        <div className="flex">
        <div className=" min-h-[100px] w-[50px] text-right  bg-slate-100 border-r border-slate-800">{
            text.split('\n').reduce((p,c, i) => {
                p.push(<div key={i} className="mr-1 font-bold opacity-40 text-right overflow-hidden">{i+1}</div>);
                return p;
            } , [])
        }</div>
        <textarea  className="outline-none pl-2 bg-slate-100 min-h-[100px] text-left w-[calc(100%-50px)] -mr-1" onChange={(e)=> setText(e.target.value)} value={text} />
        </div>);

};
export default NumberedTextarea;