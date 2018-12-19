import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { finalize } from 'rxjs/operators';
import { Article, ThreatBoard } from 'stix/unfetter/index';
import { generateUUID } from '../../global/static/generate-uuid';
import { UserCitationService } from '../board-feed/user-citations.service';
import * as threatActions from '../store/threat.actions';
import { ThreatFeatureState } from '../store/threat.reducers';
import { ThreatDashboardBetaService } from '../threat-beta.service';

@Component({
  selector: 'display-comment',
  templateUrl: './display-comment.component.html',
  styleUrls: ['./display-comment.component.scss'],
})
export class DisplayCommentComponent implements OnInit {

  @Input() comment: any; // TODO Comment interface
  @Input() parent: any; // TODO Comment interface
  @Input() user: any; 

  /**
   * The threatboard or article the comment belongs to. We only use this when persisting likes & comments added to the threatboard itself.
   */
  @Input() board_article: any;

  /**
    * Detects the user wishes to add a comment to a comment or article, pointing to the id of the object. They can
    * therefore only comment on one thing at a time.
    */
  public commentTarget: boolean | any = false;

  constructor(
    private threatboardService: ThreatDashboardBetaService,
    private threatStore: Store<ThreatFeatureState>,
    private citations: UserCitationService) { }  // TODO, move UCS?

  ngOnInit() { }

  public getCommentAvatar(comment: any) {
    return this.citations.getAvatar(comment);
  }

  public hasAvatar(comment: any) {
    return '' !== this.citations.getAvatar(comment);
  }

  public hasLikes(comment: any) {
    return (this.getLikes(comment) || []).length > 0;
  }

  public hasLiked(comment: any) {
    return (this.getLikes(comment) || []).some(user => this.user.identity.id);
  }

  private getLikes(comment: any) {
    let likes = null;
    if (comment) {
      if (comment.comment) {
        if (!comment.comment.likes) {
          comment.comment.likes = [];
        }
        likes = comment.comment.likes;
      }
    }
    return likes;
  }

  public submitComment(comment: string) {
    const date = new Date();
    let safe_avatar_url = '';
    if (this.user && this.user.auth && this.user.auth.avatar_url) {
      safe_avatar_url = this.user.auth.avatar_url;
    }
    const newComment = {
      id: `x-unfetter-comment--${generateUUID()}`,
      user: {
        id: this.user.identity.id,
        avatar_url: safe_avatar_url,
      },
      submitted: date,
      comment: {
        content: comment,
        likes: [],
        replies: undefined,
      }
    };
    if (this.commentTarget === true) {
      newComment.comment.replies = [];
    }
    this.submitThreatBoardComment(newComment);
    this.commentTarget = false;
  }

  private updateBoardAndStore(board: ThreatBoard) {
    const updateBoard$ = this.threatboardService.updateBoard(board)
      .pipe(finalize(() => updateBoard$ && updateBoard$.unsubscribe()))
      .subscribe(
        (updatedBoard) => {
          if (!updatedBoard.metaProperties) {
            if (board.metaProperties) {
              updatedBoard.metaProperties = board.metaProperties;
            }
          }
          this.threatStore.dispatch(new threatActions.UpdateBoard(updatedBoard));
          console['debug'](`(${new Date().toISOString()}) board updated`);
        },
        (err) => console.log(`(${new Date().toISOString()}) error updating board`, err)
      );
  }

  private updateArticleAndStore(article: Article) {
    const updateArticle$ = this.threatboardService.updateArticle(article)
      .pipe(finalize(() => updateArticle$ && updateArticle$.unsubscribe()))
      .subscribe(
        (updatedArticle) => {
          if (!updatedArticle.metaProperties) {
            if (article.metaProperties) {
              updatedArticle.metaProperties = article.metaProperties;
            }
          }
          this.threatStore.dispatch(new threatActions.UpdateArticle(updatedArticle));
          console['debug'](`(${new Date().toISOString()}) article updated`);
        },
        (err) => console.log(`(${new Date().toISOString()}) error updating article`, err)
      )
  }

  private submitThreatBoardComment(comment: any) {
    let isReply = false;
    if (this.board_article) {
      if (this.commentTarget === this.comment) {
        if (!this.commentTarget.comment.replies) {
          this.commentTarget.comment.replies = [];
        }
        isReply = true;
        this.commentTarget.comment.replies.push(comment);
      } else {
        if (!this.board_article.metaProperties.comments) {
          this.board_article.metaProperties.comments = [];
        }
        this.board_article.metaProperties.comments.push(comment);
      }
      if (this.board_article.type !== 'x-unfetter-article') {
        this.updateBoardAndStore(this.board_article);
      } else {
        this.updateArticleAndStore(this.board_article);
      }
    } else { // TODO figure out what object it's part of{
      console.error('Unimplemented');
    }
  }


  public hasComments(comment: any) {
    if (!comment) {
      return false;
    }

    return comment.comment && comment.comment.replies && (comment.comment.replies.length > 0);
  }

  public clickLike(comment: any) {
    const likes = this.getLikes(comment);
    if (likes) {
      const liked = likes.findIndex(user => user === this.user.identity.id);
      if (liked < 0) {
        likes.push(this.user.identity.id);
      } else {
        likes.splice(liked, 1);
      }
      if (this.board_article) {
        if (this.board_article.type !== 'x-unfetter-article') {
          this.updateBoardAndStore(this.board_article);
        } else {
          this.updateArticleAndStore(this.board_article);
        }
      } else {
        // TODO look through boards for which to update.
        console.log('no board');
      }
    }
  }

  /**
    * Attempts to grab a displayable name (rather than the UUID) of the person or organization that wrote a given
    * comment. This code is checking for organizations, too, which it shouldn't need to do. :/
    */
  public getUserName(comment: any) {
    return this.citations.getUserName(comment);
  }

}
