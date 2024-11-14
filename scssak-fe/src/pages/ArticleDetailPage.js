import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import ConfirmModal from '../components/common/ConfirmModal'; // ConfirmModal 컴포넌트 임포트
import '../styles/pages/ArticleDetailPage.css';

const ArticleDetailPage = () => {
  const {articleId} = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // 모달 상태

  useEffect(() => {
    const data = {
      article_user_id: 'scsa23008',
      article_user_name: '23기 조예지',
      article_title: '게시글 제목',
      article_content: '게시글 내용',
      article_created_at: '2024-11-11',
      article_like_count: 1,
      article_is_liked: false,
      article_image_urls: [], // 첨부된 사진들 없을 때 대비
      comments: [
        {
          comment_user_id: 'scsa23001',
          comment_user_name: '23기 김동규',
          comment_content: '댓글 내용',
          comment_created_at: '2024-11-12',
        },
        {
          comment_user_id: 'scsa23001',
          comment_user_name: '23기 김동규',
          comment_content: '댓글 내용',
          comment_created_at: '2024-11-12',
        },
      ],
    };
    setArticle(data);
  }, [articleId]);

  // 댓글 등록 버튼 클릭 핸들러
  const handleCommentSubmit = () => {
    setShowModal(true); // 모달 열기
  };

  // ConfirmModal에서 확인 버튼 클릭 시 처리할 함수
  const handleConfirm = () => {
    setShowModal(false); // 모달 닫기
    console.log('댓글이 등록되었습니다.');
  };

  // ConfirmModal에서 취소 버튼 클릭 시 처리할 함수
  const handleCancel = () => {
    setShowModal(false); // 모달 닫기
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="article-detail-page">
      <header className="header">
        <div className="back-button">
          <span>&lt; 자유 게시판</span>
        </div>
      </header>

      {article && (
        <div className="article-content-container">
          {/* 구역 1: 제목 */}
          <h2 className="article-title">{article.article_title}</h2>

          {/* 구역 2: 작성자, 작성일, 조회수 */}
          <div className="article-info">
            <span>{article.article_user_name}</span>
            <span>{article.article_created_at} | 조회수 120</span>
          </div>

          {/* 구역 3: 첨부된 사진들 */}
          <div className="article-images">
            {article.article_image_urls.length > 0 ? (
              article.article_image_urls.map((url, index) => (
                <img key={index} src={url} alt="첨부 이미지" />
              ))
            ) : (
              <p className="no-images">첨부된 이미지가 없습니다.</p>
            )}
          </div>

          {/* 구역 4: 본문 */}
          <div className="article-content">
            <p>{article.article_content}</p>
          </div>

          {/* 구역 5: 좋아요 버튼 및 댓글 개수 */}
          <div className="likes-comments">
            <button className="like-button">
              {article.article_is_liked ? '❤️' : '🤍'}{' '}
              {article.article_like_count}
            </button>
            <div className="comments-count">{article.comments.length} 댓글</div>
          </div>

          <hr className="divider" />

          {/* 구역 6: 댓글들 */}
          <div className="comments-section">
            {article.comments.map((comment, index) => (
              <div className="comment" key={index}>
                <div className="comment-info">
                  <span className="comment-user">
                    {comment.comment_user_name}
                  </span>
                  <span className="comment-date">
                    {comment.comment_created_at}
                  </span>
                </div>
                <div className="comment-content">{comment.comment_content}</div>
              </div>
            ))}
          </div>

          <div className="comment-input-section">
            <input type="text" placeholder="댓글을 입력해주세요." />
            <button onClick={handleCommentSubmit}>댓글 등록</button>
          </div>
        </div>
      )}
      <Navbar />

      {/* ConfirmModal 컴포넌트 */}
      {showModal && (
        <ConfirmModal
          message="댓글을 등록하시겠습니까?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default ArticleDetailPage;
