import MagnifyingGlassIcon from "../assets/magnifyingglass.svg";
import MicrophoneIcon from "../assets/microphone.svg";

export default function SearchBar() {
  return (
    <div className="search-bar">
      <img src={MagnifyingGlassIcon} alt="Search" className="icon-left" />
      <input type="text" placeholder="Discover your next meal" />
      <img src={MicrophoneIcon} alt="Microphone" className="icon-right" />
    </div>
  );
}
