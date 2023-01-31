import styles from "./content-cards.module.css";

const ContentCards = ({ headerContent, hasContent, bodyContent }) => {
  return (
    <div className="">
      <div
        className={
          hasContent ? styles.headerWithContent : styles.headerNoContent
        }
      >
        {headerContent}
      </div>
      {hasContent ? (
        <>
          <div className={styles.cardContent}>
            <div className="p-3">{bodyContent}</div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default ContentCards;
