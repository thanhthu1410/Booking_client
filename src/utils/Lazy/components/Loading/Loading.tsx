import "./loading.scss";
import LoadingIcon from './loading_icon.png';
export default function Loading() {
    return (
        <div className="loading_container">
            <img
                className="rotating-image"
                src={LoadingIcon}
            />
        </div>
    );
}