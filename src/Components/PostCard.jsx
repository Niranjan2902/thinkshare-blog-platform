//CSS IMPROVED CODE
import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ $id, featuredImage, title }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white rounded-xl p-4 flex flex-col justify-between h-full shadow-sm transition hover:shadow-md"> {/*className="w-full bg-gray-100 rounded-xl p-4"*/}
        {/* Image container with fixed aspect ratio */}
        <div className="w-full aspect-[4/3.5] mb-4 overflow-hidden rounded-lg">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-xl font-bold line-clamp-2">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
