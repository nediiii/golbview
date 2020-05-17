<template>
  <List item-layout="vertical" class="golb-post-comment">
    <ListItem v-for="item in comments" :key="item.id">
      <ListItemMeta
        :title="item.nickname"
        :description="new Date(item.createAt * 1000).toLocaleString()"
      >
        <Avatar
          slot="avatar"
          shape="square"
          size="large"
          :style="{
            background:
              '#' +
              Math.random()
                .toString(16)
                .substr(2, 6),
          }"
          icon="ios-person"
        />
      </ListItemMeta>
      {{ item.content }}
      <template slot="action">
        <li><Icon type="ios-thumbs-up-outline" /> 234</li>
        <li><Icon type="ios-thumbs-down-outline" /> 234</li>
        <li @click="reply(item)"><Icon type="ios-quote-outline" /> 345</li>
      </template>
      <CommentForm
        v-if="false"
        :replyTo="replyComment"
        :postID="postID"
        @refetch="refetch()"
      />
    </ListItem>
  </List>
</template>

<script>
export default {};
</script>

<style></style>
