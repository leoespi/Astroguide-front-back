import { Routes } from '@angular/router';
import { BodyComponent } from './inicio/body/body.component'; 
import { IndexComponent } from './quiz/index/index.component';
import { CreateComponent } from './quiz/create/create.component';

import { IndexComponent as IndexQuiz} from './quiz/index/index.component';
import { CreateComponent as CreateQuiz } from './quiz/create/create.component';

import { IndexComponent as IndexUsers} from './users/index/index.component';
import { CreateComponent as CreateUsers} from './users/create/create.component';
import { CreateComponent as CreateLogros } from './logros/create/create.component';
import { IndexComponent as IndexLogros } from './logros/index/index.component';

import { CreateComponent as CreateLecciones } from './lecciones/create/create.component';
import { IndexComponent as IndexLecciones } from './lecciones/index/index.component';

import { CreateComponent as CreateFeeds } from './feeds/create/create.component';
import { IndexComponent as IndexFeeds } from './feeds/index/index.component';

import { IndexComponent as IndexComment } from './comment/index/index.component';

import { CreateComponent as CreateCategory } from './category/create/create.component';
import { IndexComponent as IndexCategory } from './category/index/index.component';

export const routes: Routes = [
    {path: '', redirectTo:'inicio/body',pathMatch:'full'},

    {path: 'inicio/body', component: BodyComponent },

    
    {path: 'quiz/index', component: IndexQuiz },
    {path: 'quiz/create', component: CreateQuiz },
    {path: 'quiz/editar/:id', component: CreateQuiz }, 
                                                                                        
    {path: 'users/index', component:IndexUsers},
    {path: 'users/create', component: CreateUsers },
    {path: 'users/editar/:id', component: CreateUsers },

    {path: 'logros/index', component: IndexLogros },
    {path: 'logros/create', component: CreateLogros },
    {path: 'logros/editar/:id', component: CreateLogros }, 

    {path: 'lecciones/index', component: IndexLecciones },
    {path: 'lecciones/create', component: CreateLecciones },
    {path: 'lecciones/editar/:id', component: CreateLecciones }, 

    
    {path: 'feeds/index', component: IndexFeeds },
    {path: 'feeds/create', component: CreateFeeds },
    {path: 'feeds/editar/:id', component: CreateFeeds }, 
    
    {path: 'feed/comments/index', component: IndexComment },

    {path: 'category/index', component: IndexCategory },
    {path: 'category/create', component: CreateCategory },
    {path: 'category/editar/:id', component: CreateCategory }, 

];
