import Well from "../../shared/components/Well";
import styles from "./Comments.styles.js";

const Comments = () => {
  return (
    <Well size="custom">
      <h3 className="comments__heading">Comments</h3>

      <>
        <div id="disqus_thread" />

        <noscript>
          Please enable JavaScript to view the{" "}
          <a href="//disqus.com/?ref_noscript">comments powered by Disqus.</a>
        </noscript>

        <style jsx global>
          {styles}
        </style>
      </>
    </Well>
  );
};

export default Comments;
