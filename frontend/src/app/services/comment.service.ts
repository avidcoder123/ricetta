import { Injectable } from '@angular/core';
import {NbToastrService} from "@nebular/theme";
import {AuthService, User} from "./auth.service";

export interface Comment {
  recipeId: number,
  username: string,
  rating: 1|2|3|4|5,
  text: string,
  date: Date
}

export enum CommentStatus {
  doesNotExist
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private toastr: NbToastrService,
              private auth: AuthService) {
    this.auth.currentUser.subscribe(_ => this.currentUser = _)
    for(let i = 0; i<5; i++) {
      this.commentCache.set(i, {
        recipeId: 1,
        username: "hi",
        rating: 4,
        text: "Good recipe",
        date: new Date
      })
    }
  }

  private currentUser?: User

  private commentCache = new Map<number, Comment>()

  public create(details: Comment) {
      if(!this.currentUser) {
        return this.toastr.warning("Only logged in users can comment. How did you access this function anyway?!")
      } else {
        let recipe = this.findByRecipe(details.recipeId)
        let alreadyCommented = false
        if(recipe !== CommentStatus.doesNotExist) {
          for(let comment of recipe) {
            if(comment.username == this.currentUser!.username && comment.recipeId == details.recipeId) {
              alreadyCommented = true
              break
            }
          }
        } else {
          return CommentStatus.doesNotExist
        }
        if(alreadyCommented) {
          return this.toastr.warning("You can't comment on the same recipe twice.")
        } else {
          return this.commentCache.set(this.commentCache.size+1, details)
        }
      }
  }

  public findByRecipe(key: number) {
    let comments: Comment[] = [];
    this.commentCache.forEach(comment => {
      if(comment.recipeId == key) {
        comments.push(comment)
      }
    })
    if(comments.length > 0) {
      return comments.slice(0, 10)
    } else {
      return CommentStatus.doesNotExist
    }
  }
}