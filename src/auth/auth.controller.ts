import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('auth')
@ApiUnauthorizedResponse({ description: 'Unauthorized user.' })
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({
    summary: 'Authenticate user.',
    description:
      'Authenticate a user and generate an access token. To make item requests, is necessary to copy the access token and paste it into authorization.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      example: {
        username: 'username_example',
        password: 'password_example',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully logged.',
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
