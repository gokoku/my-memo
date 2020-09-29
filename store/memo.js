import moment from "moment";

export const state = () => ({
  memo: [],
  page: 0
});

export const mutations = {
  insert(state, obj) {
    if (obj.title === "") return;
    var date = moment().format("MM/DD hh:mm");
    state.memo.unshift({
      title: obj.title,
      content: obj.content,
      created: date
    });
  },
  set_page(state, p) {
    state.page = p;
  },
  remove(state, obj) {
    var num = 0;
    state.memo.forEach((memo, i) => {
      if (
        memo.title == obj.title &&
        memo.content == obj.content &&
        memo.created == obj.created
      ) {
        state.memo.splice(i, 1);
        return;
      }
    });
  }
};
