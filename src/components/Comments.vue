<template>
  <Card dis-hover style="margin: 20px;background: smokewhite;">
    评论区
    <div>
      <List item-layout="vertical" class="golb-post-comment">
        <CommentsListItem
          v-for="item in comments"
          :key="item.id"
          :comment="item"
          :postID="postID"
          @refetch="refetch()"
        >
        </CommentsListItem>
      </List>
    </div>
    <CommentForm
      :replyTo="replyComment"
      :postID="postID"
      @refetch="refetch()"
    />
  </Card>
</template>

<script>
import CommentForm from "@/components/CommentForm";
import CommentsListItem from "@/components/CommentsListItem";

export default {
  name: "Comments",
  props: {
    comments: {
      type: Array,
      default: () => {
        return [];
      },
    },
    postID: {
      type: String,
      default: "0",
    },
  },

  components: {
    CommentForm,
    CommentsListItem,
  },
  data() {
    return {
      replyComment: {},
    };
  },
  methods: {
    reply(comment) {
      this.replyComment = comment;
    },
    refetch() {
      this.$emit("refetch");
    },
  },
};
</script>

<style lang="less">
.golb-post-comment {
  .ivu-list-item-meta-title {
    margin-bottom: 0px;
  }
  .ivu-list-item-meta-description {
    font-size: 12px;
    line-height: 16px;
  }
}
</style>
