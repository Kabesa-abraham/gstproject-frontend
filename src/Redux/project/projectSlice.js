import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    projects:[],
    projet:{},
    error:null,
    loading:false,
    showMore:true
};

//mes projets crée
export const fetchProjects = createAsyncThunk('projects/fetchProjects' , async(searchValue) =>{
    try {
        const res = await fetch(`/backend/projet/fetchProject?searchTerm=${searchValue}`);
        const data = await res.json();
        if(!res.ok){console.log(data.message)}
        if(res.ok){return data.project}
    } catch (error) {
        console.log(error)
    }
} )
export const handleShowMoreProjects = createAsyncThunk('projects/handleShowMoreProjects' , async(startIndex) =>{
    try {
        const res = await fetch(`/backend/projet/fetchProject?startIndex=${startIndex}`);
        const data = await res.json();
        if(!res.ok){console.log(data.message)}
        if(res.ok){ return data.project }
    } catch (error) {
        console.log(error);
    }
})

//les projets donc je participe
export const fetchProjectsParticiped = createAsyncThunk('projects/fetchProjectsParticiped' , async(searchValue) =>{
    try {
        const res = await fetch(`/backend/projet/fetchProject?searchTerm=${searchValue}`);
        const data = await res.json();
        if(!res.ok){console.log(data.message)}
        if(res.ok){return data.projectParticipated}
    } catch (error) {
        console.log(error)
    }
} )

export const fetchTheProject = createAsyncThunk('projects/fetchTheProject' , async(projectId) =>{
    try {
        const res = await fetch(`/backend/projet/getTheProject/${projectId}`);
        const data = await res.json();
        if(!res.ok){console.log(data.message)}
        if(res.ok){return data}
    } catch (error) {
        console.log(error)
    }
} )

const projectSlice = createSlice({
    name:'project',
    initialState,
    extraReducers: (builder) =>{
        builder.addCase(fetchProjects.pending , (state) =>{
            state.loading = true,
            state.error = null
        }),
        builder.addCase(fetchProjects.fulfilled , (state,action) =>{
            state.projects = action.payload
            state.loading = false,
            state.error = null
            if(action.payload.length < 10){
                state.showMore = false
            }else{state.showMore = true}
        }),
        builder.addCase(fetchProjects.rejected , (state,action) =>{
            state.loading = false,
            state.error = action.payload
        }),


        builder.addCase(fetchTheProject.pending , (state)=>{
            state.loading = true,
            state.error = ""
        }),
        builder.addCase(fetchTheProject.fulfilled , (state,action) =>{
            state.projet = action.payload
            state.loading = false,
            state.error = null
        }),
        builder.addCase(fetchTheProject.rejected , (state,action) =>{
            state.loading = false,
            state.error = action.payload
        }) 



        builder.addCase(handleShowMoreProjects.pending , (state)=>{
            state.loading = true,
            state.error = ""
        }),
        builder.addCase(handleShowMoreProjects.fulfilled , (state,action) =>{
            state.projects = [...state.projects , ...action.payload]
            state.loading = false,
            state.error = null
            if(action.payload.length < 10){
                state.showMore = false
            }
            else{state.showMore = true}
        }),
        builder.addCase(handleShowMoreProjects.rejected , (state,action) =>{
            state.loading = false,
            state.error = action.payload
        }),



        builder.addCase(fetchProjectsParticiped.pending , (state) =>{
            state.loading = true,
            state.error = null
        }),
        builder.addCase(fetchProjectsParticiped.fulfilled , (state,action) =>{
            state.projects = action.payload
            state.loading = false,
            state.error = null
        }),
        builder.addCase(fetchProjectsParticiped.rejected , (state,action) =>{
            state.loading = false,
            state.error = action.payload
        })
    },

    reducers: {
        updateProjectStart: (state) =>{
            state.loading= true,
            state.error = null
        },
        updateProjectSuccess: (state) =>{
            state.loading= false,
            state.error = null
        },
        updateProjectFailed: (state,action) =>{
            state.loading= false,
            state.error = action.payload
        },
     }
})

export const {updateProjectFailed,updateProjectStart,updateProjectSuccess} = projectSlice.actions
export default projectSlice.reducer