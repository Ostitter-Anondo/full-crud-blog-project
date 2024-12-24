import useMainContext from "../utils/useMainContext";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import NotFound from "./NotFound";
import { FaRegTrashCan } from "react-icons/fa6";

import "ka-table/style.css";

const Wishlist = () => {
  const { wishlist } = useMainContext();
  console.log(wishlist);
  if (!wishlist) {
    return <NotFound />;
  }

  return (
    <>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main className="min-h-screen">
        <div className="w-11/12 mx-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Article</th>
                <th>Category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {wishlist.wishlist.map((article, index) => (
                <tr key={index} className="h-full">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={article.cover} alt="articleIMG" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{article.title}</div>
                        <div className="text-sm opacity-50">{article.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-sm badge-outline">{article.category}</span>
                  </td>
                  <th>
                    <div className="flex gap-6 justify-center">
                      <button
                        onClick={() => {}}
                        className="btn btn-error btn-xs"
                      >
                        <FaRegTrashCan />
                        Delete
                      </button>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th>Article</th>
                <th>Category</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Wishlist;