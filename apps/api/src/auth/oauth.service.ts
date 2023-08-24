import { HttpService } from '@nestjs/axios'
import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { catchError, firstValueFrom } from 'rxjs'
import {
  GithubOAuthData,
  GithubOAuthEmailData,
  GoogleOAuthData,
} from './model/auth.payload'
import { AxiosError } from 'axios'
import { GithubAuthInput, GoogleAuthInput } from './model/auth.input'

@Injectable()
export class OAuthService {
  constructor(private readonly httpService: HttpService) {}

  private readonly logger = new Logger(OAuthService.name)

  /**
   * Retrieve the user account profile in google
   * @returns {GoogleOAuthData} github account user info
   */
  async retrieveGoogleUser({
    idToken,
    accessToken,
  }: GoogleAuthInput): Promise<GoogleOAuthData> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<GoogleOAuthData>(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data)
            throw new BadRequestException('auth/retrieve-google-user-failed', {
              cause: new Error(),
              description: 'Opps, cannot get the google user',
            })
          }),
        ),
    )

    return data
  }

  /**
   * Retrieve the user account profile in github
   * @returns {GithubOAuthData} github account user info
   */
  async retrieveGithubUser({
    accessToken,
  }: GithubAuthInput): Promise<GithubOAuthData> {
    const emailRes = await firstValueFrom(
      this.httpService
        .get<GithubOAuthEmailData[]>(`https://api.github.com/user/emails`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data)
            throw new BadRequestException('auth/retrieve-github-email-failed', {
              cause: new Error(),
              description: 'Opps, cannot get the github user',
            })
          }),
        ),
    )

    const { data } = await firstValueFrom(
      this.httpService
        .get<GithubOAuthData>(`https://api.github.com/user`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data)
            throw new BadRequestException('auth/retrieve-github-user-failed', {
              cause: new Error(),
              description: 'Opps, cannot get the github user',
            })
          }),
        ),
    )

    return { ...data, email: emailRes.data[0].email }
  }
}
