<template>
  <div class="mx-auto flex flex-col items-left max-w-sm m-10 px-3 py-2 shadow-lg bg-gray-100 rounded-lg">
    <h1 class="text-5xl text-gray-500 font-serif">Memorize</h1>
    <div class="border round-lg px-2 py-4 shadow-lg">
      <div class="mb-3">
        <input
          class="input-text w-3/4 mr-3 mb-3"
          type="text"
          name="title"
          placeholder="Title"
          v-model="title"
          @focus="set_flg"
        >
        <button
          class="btn-blue shadow-sm"
          @click="find"
        >find</button>
      </div>

      <div class="mb-3">
        <textarea
          class="input-text w-full mr-3 h-32"
          name="memo"
          placeholder="Memo"
          v-model="content"
          @focus="set_flg"
        />
      </div>

      <div class="mb-3">
        <button
          class="btn-blue shadow-sm"
          @click="insert"
        >save</button>
        <button
          v-if="sel_flg != false"
          class="btn-red"
          @click="remove"
        >delete</button>
      </div>
    </div>

    <div class="border round-lg px-2 py-3 mt-4">
      <div class="w-full py-3 text-center">
        <span v-show="!prev_page" class="text-white bg-green-200 rounded px-4 py-2">◀</span>
        <span v-show="prev_page" class="text-white bg-green-500 rounded px-4 py-2" @click="prev">◀</span>

        <span v-show="!next_page" class="text-white bg-green-200 rounded px-4 py-2">▶</span>
        <span v-show="next_page" class="text-white bg-green-500 rounded px-4 py-2" @click="next">▶</span>
      </div>
      <ul class="list">
        <li
          class="input-text"
          v-for="(item, index) in page_items" :key="index">
          <p @click="select(item)" >
            <span class="text-xs text-gray-500 mr-2">
              {{ item.created }}
            </span>
            <span class="text-base font-bold font-serif text-gray-700">
              {{ item.title }}
            </span>
          </p>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  data: function(){
    return {
      title: '',
      content: '',
      num_per_page: 3,
      find_flg: false,
      sel_flg: false
    }
  },
  computed: {
    memo: function() {
      return this.$store.state.memo.memo
    },
    page_items: function() {
      if( this.find_flg ) {
        var arr = []
        var data = this.$store.state.memo.memo
        data.forEach( element => {
          if( element.title.toLowerCase().indexOf(this.title.toLowerCase()) >= 0) {
            arr.push(element)
          }
        })
        return arr
      } else if( this.sel_flg != false ) {
        return [this.sel_flg]
      } else {
        return this.$store.state.memo.memo.slice(
          this.num_per_page * this.$store.state.memo.page,
          this.num_per_page * (this.$store.state.memo.page + 1)
        )
      }
    },
    prev_page: function() {
      return this.page !== 0
    },
    next_page: function() {
      return this.page < this.page_number
    },
    page_number: function() {
      return Math.floor((this.$store.state.memo.memo.length - 1) / this.num_per_page)
    },
    page: {
      get: function() {
        return this.$store.state.memo.page
      },
      set: function(p) {
        var pg = p > this.page_number ? this.page_number : p
        pg = pg < 0 ? 0 : pg
        this.$store.commit('memo/set_page', pg)
      }
    }
  },
  methods: {
    set_flg: function() {
      if( this.find_flg || this.sel_flg != false ) {
        this.find_flg = false
        this.sel_flg = false
        this.title = ''
        this.content = ''
      }
    },
    insert: function() {
      this.$store.commit('memo/insert', {title: this.title, content: this.content})
      this.title = ''
      this.content = ''
    },
    select: function(item) {
      this.find_flg = false
      this.sel_flg = item
      this.title = item.title
      this.content = item.content
    },
    remove: function() {
      if( this.sel_flg == false ) {
        return
      } else {
        this.$store.commit('memo/remove', this.sel_flg)
        this.set_flg()
      }
    },
    find: function() {
      this.sel_flg = false
      this.find_flg = true
    },
    next: function() {
      this.page++
    },
    prev: function() {
      this.page--
    }
  },

  created: function() {
    this.$store.commit('memo/set_page', 0)
  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/

</style>
