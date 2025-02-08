import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
    tasks: [],
    theTask:{},
    loading:false,
    error:null,
    showMore:true
}

export const fetchTaskes = createAsyncThunk('taskes/fetchTaskes' , async({searchValue,status,projectId = ""}) =>{//679f109f1048390951b0123f
    try {
        const res = await fetch(`/backend/task/fetchTaskAndGet?searchTerm=${searchValue}&status=${status}&projectId=${projectId}`);
        const data = await res.json();
        if(!res.ok){console.log(data.message)}
        if(res.ok){return data.task}
    } catch (error) {
        console.log(error)
    }
})
export const handleShowMoreTaskes = createAsyncThunk('taskes/handleShowMoreTaskes' , async(startIndex) =>{
    try {
        const res = await fetch(`/backend/task/fetchTaskAndGet?startIndex=${startIndex}`);
        const data = await res.json();
        if(!res.ok){console.log(data.message)}
        if(res.ok){return data.task}
    } catch (error) {
        console.log(error)
    }
})

export const handleFetchTheTask = createAsyncThunk('taskes/handleFetchTheTask' , async(taskId) =>{
    try {
        const res = await fetch(`/backend/task/fetchTheTask/${taskId}`);
        const data = await res.json();
        if(!res.ok){console.log(data.message)}
        if(res.ok){return data}
    } catch (error) {
        console.log(error)
    }
})

const taskSlice = createSlice({
    name:"task",
    initialState:initialState,
    extraReducers : (builder) =>{
        builder.addCase(fetchTaskes.pending , (state) =>{
            state.loading = true,
            state.error = null
        }),
        builder.addCase(fetchTaskes.fulfilled , (state,action) =>{
            state.tasks = action.payload
            state.loading = false,
            state.error = null
            if(action.payload.length < 10){
                state.showMore = false
            }else{
                state.showMore = true
            }
        }),
        builder.addCase(fetchTaskes.rejected , (state,action) =>{
            state.loading = false,
            state.error = action.payload
        }),


        builder.addCase(handleShowMoreTaskes.pending , (state) =>{
            state.loading = true,
            state.error = null
        }),
        builder.addCase(handleShowMoreTaskes.fulfilled , (state,action) =>{
            state.tasks = [...state.tasks , ...action.payload]
            state.loading = false,
            state.error = null
            if(action.payload.length < 10){
                state.showMore = false
            }else{
                state.showMore = true
            }
        }),
        builder.addCase(handleShowMoreTaskes.rejected , (state,action) =>{
            state.loading = false,
            state.error = action.payload
        })



        builder.addCase(handleFetchTheTask.pending , (state) =>{
            state.loading = true,
            state.error = null
        }),
        builder.addCase(handleFetchTheTask.fulfilled , (state,action) =>{
            state.theTask = action.payload
            state.loading = false,
            state.error = null
        }),
        builder.addCase(handleFetchTheTask.rejected , (state,action) =>{
            state.loading = false,
            state.error = action.payload
        })
    },
    reducers:{
        addTaskStart: (state) =>{
            state.loading = true,
            state.error = null
        },
        addTaskSuccess: (state) =>{
            state.loading = false,
            state.error = null
        },
        addTaskFailed: (state,action) =>{
            state.loading = false,
            state.error = action.payload
        },


        updateTaskStart: (state) =>{
            state.loading = true,
            state.error = null
        },
        updateTaskSuccess: (state) =>{
            state.loading = false,
            state.error = null
        },
        updateTaskFailed: (state,action) =>{
            state.loading = false,
            state.error = action.payload
        },

    }
})

export const {addTaskStart,addTaskSuccess,addTaskFailed,
              updateTaskFailed,updateTaskStart,updateTaskSuccess
             } = taskSlice.actions
export default taskSlice.reducer