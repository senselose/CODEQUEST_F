import React, { useEffect, useState} from "react";

const MyPosts = () => {
    const [posts, setposts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰값 가져오기

            try {
                const response = await fetch("http://localhost:8080/api/posts/my-posts", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error ("내가 쓴 글을 불러오지 못했습니다.");
                }

                const data = await response.json();
                setposts(data);
            } catch (error) {
                console.log(error.massage);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <div>로딩 중...</div>;

    return (
        <div style={{ padding: "20px" }}>
            <h2>작성한 글</h2>

            {/* 게시글이 없을 때 */}
            {posts.length === 0 ? (
                <div style={{ textAlign: "center", marginTop: "50px"}}>
                    <p style={{ color: "gray" }}>작성한 글을 확인할 수 있어요.</p>
                    <button
                        onClick={() => navigator("/main")}
                        style={{
                            marginTop: "20px",
                            padding: "10px 20px",
                            backgroundColor: "#E0E0E0",
                            borderRadius: "5px",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        실시간 감정 둘러보기
                    </button>
                </div>
            ) : (
                // 게시글이 있을 때 (12.17 보드, 댓글에 아이디 누락. 백앤드 엎어야 함)
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {posts.map((post) => (
                        <li key={post.id} style={{ marginBottom: "20px", borderBottom: "1px solid #ddd", paddingBottom: "10px" }}> 
                            <h4>{post.title}</h4>
                            <p style={{ color: "gray" }}>{post.data}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyPosts;