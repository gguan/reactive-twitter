package models.user

import com.mohiva.play.silhouette.core.providers.CommonSocialProfile
import com.mohiva.play.silhouette.core.services.{AuthInfo, IdentityService}
import models.user.UserSummary

import scala.concurrent.Future

/**
 * Handles actions to users.
 */
trait UserService extends IdentityService[User] {

  /**
   * Saves a user.
   *
   * @param user The user to save.
   * @return The saved user.
   */
  def save(user: User): Future[User]

  /**
   * Saves the social profile for a user.
   *
   * If a user exists for this profile then update the user, otherwise create a new user with the given profile.
   *
   * @param profile The social profile to save.
   * @return The user for whom the profile was saved.
   */
  def save[A <: AuthInfo](profile: CommonSocialProfile[A]): Future[User]

  def discoverUser(userId: String): Future[List[User]]
  def discoverThreeUser(userId: String): Future[List[User]]

  def follow(followed: String, follower: String): Unit
  def unfollow(unfollowed: String, follower: String): Unit

  def loadUserSummary(username: String): Future[UserSummary]
}
