import "../style.css"

export default function Header() {
      return (
            <div className="header">
            <img
             className="object-cover h-82 md:h-99 w-full"
             src={require("../images/main.png")} alt="" />
            </div>
            
      )
}